// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ \‾‾\  /‾‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     |  \  \/  /
// | | | | | |        |  |    |  ___] |     / |     /   \    /
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \     |  |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\    |__|
// MADE ON EARTH BY HUMANS

const commitNumber = document.querySelector('#commit-number')
const commitDescription = document.querySelector('#commit-description')

async function githubStats(username, token = globalThis.process?.env?.GITHUB_TOKEN) {
  const headers = {
    Accept: "application/vnd.github+json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const get = async (url) => {
    const res = await fetch(url, { headers });
    if (res.status === 404) throw new Error(`Utilisateur "${username}" introuvable`);
    if (res.status === 403 || res.status === 429)
      throw new Error("Limite de requêtes GitHub atteinte (ajoute un GITHUB_TOKEN)");
    if (!res.ok) throw new Error(`Erreur GitHub ${res.status} : ${res.statusText}`);
    return res.json();
  };

  const name = encodeURIComponent(username);
  const [user, commits] = await Promise.all([
    get(`https://api.github.com/users/${name}`),
    get(`https://api.github.com/search/commits?q=author:${name}&per_page=1`),
  ]);

  return {
    pseudo: user.login,
    repos: user.public_repos,
    commits: commits.total_count,
  };
}

// --- CLI ---
const pseudo = "octerry";
if (!pseudo) {
  console.error("Usage : node github-stats.js <pseudo>");
  process.exit(1);
}

githubStats(pseudo)
  .then(({ pseudo, repos, commits }) => {
    commitNumber.innerHTML = commits
    commitDescription.innerHTML = commitDescription.innerHTML.replace('27', repos)
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });