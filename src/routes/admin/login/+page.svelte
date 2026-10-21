<script lang="ts">
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Admin Login — Shivam Narthanalayam</title>
</svelte:head>

<div class="login-wrap">
  <div class="login-card">
    <div class="logo">🪔</div>
    <h1>Admin Access</h1>
    <p class="subtitle">Shivam Narthanalayam Dashboard</p>

    <form method="POST">
      <div class="field">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter admin password"
          required
          autofocus
        />
      </div>

      {#if form?.error}
        <p class="error">{form.error}</p>
      {/if}

      <button type="submit">Sign In</button>
    </form>
  </div>
</div>

<style>
  .login-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #faf9f6;
    padding: 1rem;
  }

  .login-card {
    background: white;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    text-align: center;
  }

  .logo {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.25rem;
  }

  .subtitle {
    color: #888;
    font-size: 0.875rem;
    margin: 0 0 2rem;
  }

  .field {
    text-align: left;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #555;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input {
    width: 100%;
    padding: 0.7rem 0.9rem;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #b5451b;
  }

  .error {
    color: #c0392b;
    font-size: 0.875rem;
    margin: 0.5rem 0 1rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background: #b5451b;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    margin-top: 0.5rem;
  }

  button:hover {
    background: #963b17;
  }
</style>
