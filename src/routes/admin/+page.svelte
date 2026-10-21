<script lang="ts">
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
  const { stats, dailyTrend, recent } = data;

  function fmt(d: string) {
    return new Date(d).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }
  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata", day: "2-digit", month: "short"
    });
  }
  const maxCount = $derived(dailyTrend ? Math.max(...dailyTrend.map((d) => d.count), 1) : 1);
</script>

<svelte:head><title>Dashboard — Shivam Narthanalayam</title></svelte:head>

<div class="dash">
  <header>
    <div class="header-left">
      <span class="logo">🪔</span>
      <div>
        <h1>Shivam Narthanalayam</h1>
        <p>Business Dashboard</p>
      </div>
    </div>
    <form method="POST" action="?/logout">
      <button type="submit" class="logout-btn">Sign Out</button>
    </form>
  </header>

  {#if data.error}
    <div class="error-banner">Error loading data: {data.error}</div>
  {:else if stats}
    <section class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-value">{stats.total}</div>
        <div class="kpi-label">Total Enquiries</div>
      </div>
      <div class="kpi-card accent">
        <div class="kpi-value">{stats.thisMonth}</div>
        <div class="kpi-label">Last 30 Days</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">{stats.thisWeek}</div>
        <div class="kpi-label">Last 7 Days</div>
      </div>
    </section>

    <section class="breakdown-row">
      <div class="breakdown-card">
        <h2>Class Type</h2>
        <div class="bar-list">
          {#each [["Offline","offline","#b5451b"],["Online","online","#2980b9"],["Both","both","#27ae60"],["Unspecified","unspecified","#bbb"]] as [label, key, color]}
            <div class="bar-item">
              <span class="bar-label">{label}</span>
              <div class="bar-track">
                <div class="bar-fill" style="width:{stats.total ? (stats.byClassType[key] / stats.total) * 100 : 0}%;background:{color}"></div>
              </div>
              <span class="bar-count">{stats.byClassType[key]}</span>
            </div>
          {/each}
        </div>
      </div>
      <div class="breakdown-card">
        <h2>Source</h2>
        <div class="source-list">
          <div class="source-item">
            <span>📋</span>
            <div class="source-info">
              <span class="source-name">Contact Form</span>
              <span class="source-count">{stats.bySource.contact_form} enquiries</span>
            </div>
            <div class="source-pct">{stats.total ? Math.round((stats.bySource.contact_form / stats.total) * 100) : 0}%</div>
          </div>
          <div class="source-item">
            <span>🤖</span>
            <div class="source-info">
              <span class="source-name">Chatbot</span>
              <span class="source-count">{stats.bySource.chatbot} enquiries</span>
            </div>
            <div class="source-pct">{stats.total ? Math.round((stats.bySource.chatbot / stats.total) * 100) : 0}%</div>
          </div>
        </div>
      </div>
    </section>

    {#if dailyTrend && dailyTrend.length > 0}
      <section class="trend-card">
        <h2>30-Day Trend</h2>
        <div class="trend-chart">
          {#each dailyTrend as day}
            <div class="trend-col" title="{fmtDate(day.date)}: {day.count}">
              <div class="trend-bar" style="height:{(day.count / maxCount) * 100}%"></div>
              {#if day.count > 0}<span class="trend-num">{day.count}</span>{/if}
            </div>
          {/each}
        </div>
        <div class="trend-dates">
          <span>{fmtDate(dailyTrend[0].date)}</span>
          <span>{fmtDate(dailyTrend[dailyTrend.length - 1].date)}</span>
        </div>
      </section>
    {/if}

    <section class="table-card">
      <h2>Recent Enquiries ({recent.length})</h2>
      {#if recent.length === 0}
        <p class="empty">No enquiries yet.</p>
      {:else}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Name</th><th>Email</th><th>Phone</th>
                <th>Country</th><th>Class</th><th>Source</th><th>Message</th>
              </tr>
            </thead>
            <tbody>
              {#each recent as e}
                <tr>
                  <td class="nowrap">{fmt(e.created_at)}</td>
                  <td>{e.name}</td>
                  <td><a href="mailto:{e.email}">{e.email}</a></td>
                  <td>{e.phone ?? "—"}</td>
                  <td>{e.country ?? "—"}</td>
                  <td><span class="badge {e.preferred_class_type ?? 'unspec'}">{e.preferred_class_type ?? "—"}</span></td>
                  <td><span class="badge src">{e.source === "contact_form" ? "form" : (e.source ?? "?")}</span></td>
                  <td class="msg-cell">{e.message ?? "—"}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  {/if}
</div>

<style>
  *{box-sizing:border-box;margin:0;padding:0}
  .dash{min-height:100vh;background:#f5f4f0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1a1a1a}
  header{display:flex;align-items:center;justify-content:space-between;background:white;padding:1rem 1.5rem;border-bottom:1px solid #e8e8e8;position:sticky;top:0;z-index:10}
  .header-left{display:flex;align-items:center;gap:.75rem}
  .logo{font-size:1.75rem}
  header h1{font-size:1.1rem;font-weight:700}
  header p{font-size:.75rem;color:#888}
  .logout-btn{padding:.45rem 1rem;background:transparent;border:1.5px solid #ddd;border-radius:6px;font-size:.875rem;cursor:pointer;color:#555}
  .logout-btn:hover{border-color:#b5451b;color:#b5451b}
  .error-banner{background:#fee;color:#c0392b;padding:1rem 1.5rem;border-left:4px solid #c0392b;margin:1.5rem;border-radius:4px}
  .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;padding:1.5rem}
  .kpi-card{background:white;border-radius:10px;padding:1.5rem;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .kpi-card.accent{background:#b5451b;color:white}
  .kpi-value{font-size:2.5rem;font-weight:700;line-height:1}
  .kpi-label{font-size:.8rem;margin-top:.5rem;opacity:.7;text-transform:uppercase;letter-spacing:.04em}
  .breakdown-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding:0 1.5rem 1rem}
  .breakdown-card{background:white;border-radius:10px;padding:1.25rem 1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  h2{font-size:.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:1rem}
  .bar-list{display:flex;flex-direction:column;gap:.6rem}
  .bar-item{display:flex;align-items:center;gap:.5rem}
  .bar-label{font-size:.875rem;width:90px;flex-shrink:0}
  .bar-track{flex:1;height:8px;background:#f0f0f0;border-radius:4px;overflow:hidden}
  .bar-fill{height:100%;border-radius:4px;min-width:2px}
  .bar-count{font-size:.875rem;font-weight:600;width:28px;text-align:right}
  .source-list{display:flex;flex-direction:column;gap:.75rem}
  .source-item{display:flex;align-items:center;gap:.75rem;padding:.75rem;background:#f8f8f8;border-radius:8px;font-size:1.25rem}
  .source-info{flex:1;display:flex;flex-direction:column}
  .source-name{font-size:.875rem;font-weight:600}
  .source-count{font-size:.75rem;color:#888}
  .source-pct{font-size:1.1rem;font-weight:700;color:#b5451b}
  .trend-card{background:white;border-radius:10px;padding:1.25rem 1.5rem;margin:0 1.5rem 1rem;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .trend-chart{display:flex;align-items:flex-end;gap:2px;height:80px;margin-top:.75rem}
  .trend-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;position:relative;cursor:pointer}
  .trend-bar{width:100%;background:#b5451b;border-radius:2px 2px 0 0;min-height:2px;opacity:.8}
  .trend-num{position:absolute;top:-16px;font-size:9px;font-weight:700;color:#b5451b}
  .trend-dates{display:flex;justify-content:space-between;font-size:.75rem;color:#aaa;margin-top:.5rem}
  .table-card{background:white;border-radius:10px;padding:1.25rem 1.5rem;margin:0 1.5rem 1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.06);overflow:hidden}
  .table-wrap{overflow-x:auto;margin-top:.75rem}
  table{width:100%;border-collapse:collapse;font-size:.875rem}
  th{text-align:left;padding:.6rem .75rem;font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:#888;border-bottom:2px solid #f0f0f0;white-space:nowrap}
  td{padding:.65rem .75rem;border-bottom:1px solid #f5f5f5;vertical-align:top;max-width:200px;overflow:hidden;text-overflow:ellipsis}
  td.nowrap{white-space:nowrap}
  td.msg-cell{max-width:250px;font-size:.8rem;color:#555}
  tr:hover td{background:#faf9f6}
  a{color:#b5451b;text-decoration:none}
  a:hover{text-decoration:underline}
  .badge{display:inline-block;padding:.2rem .5rem;border-radius:4px;font-size:.75rem;font-weight:600;text-transform:capitalize;background:#f0f0f0;color:#555}
  .badge.offline{background:#fde8e1;color:#b5451b}
  .badge.online{background:#e3f0fa;color:#2980b9}
  .badge.both{background:#e4f8ec;color:#27ae60}
  .badge.src{background:#f0e6ff;color:#7c3aed}
  .empty{color:#aaa;text-align:center;padding:2rem}
  @media(max-width:768px){
    .kpi-row{gap:.5rem;padding:1rem}
    .kpi-value{font-size:1.75rem}
    .breakdown-row{grid-template-columns:1fr;padding:0 1rem .5rem}
    .trend-card,.table-card{margin:0 1rem 1rem}
  }
</style>
