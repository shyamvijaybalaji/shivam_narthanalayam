import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const password = form.get("password") as string;

    if (!env.ADMIN_SECRET) {
      return { error: "Admin access not configured." };
    }

    if (password === env.ADMIN_SECRET) {
      cookies.set("admin_session", "authenticated", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      throw redirect(302, "/admin");
    }

    return { error: "Incorrect password." };
  }
};
