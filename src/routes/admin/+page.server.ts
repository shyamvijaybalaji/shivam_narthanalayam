import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import type { PageServerLoad, Actions } from "./$types";

function getAdminSupabase() {
  return createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

export const load: PageServerLoad = async ({ cookies }) => {
  const session = cookies.get("admin_session");
  if (!session || session !== "authenticated") {
    throw redirect(302, "/admin/login");
  }

  const supabase = getAdminSupabase();
  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return { stats: null, dailyTrend: [], recent: [], error: error.message };
  }

  const all = enquiries ?? [];
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 6);
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now);
  startOfMonth.setDate(now.getDate() - 29);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisWeek = all.filter((e) => new Date(e.created_at) >= startOfWeek).length;
  const thisMonth = all.filter((e) => new Date(e.created_at) >= startOfMonth).length;

  const byClassType = {
    offline: all.filter((e) => e.preferred_class_type === "offline").length,
    online: all.filter((e) => e.preferred_class_type === "online").length,
    both: all.filter((e) => e.preferred_class_type === "both").length,
    unspecified: all.filter((e) => !e.preferred_class_type).length
  };

  const bySource = {
    contact_form: all.filter((e) => e.source === "contact_form").length,
    chatbot: all.filter((e) => e.source === "chatbot").length
  };

  const dailyMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dailyMap[d.toISOString().split("T")[0]] = 0;
  }
  all.forEach((e) => {
    const key = new Date(e.created_at).toISOString().split("T")[0];
    if (key in dailyMap) dailyMap[key]++;
  });

  return {
    stats: { total: all.length, thisWeek, thisMonth, byClassType, bySource },
    dailyTrend: Object.entries(dailyMap).map(([date, count]) => ({ date, count })),
    recent: all.slice(0, 25)
  };
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete("admin_session", { path: "/" });
    throw redirect(302, "/admin/login");
  }
};
