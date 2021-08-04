const apiGet = async (endpoint) => {
  const response = await fetch(`https://discord.pt/a/${endpoint}`);
  const myJson = await response.json();
  return myJson;
}

const grabString = async () => {
  const resp = await apiGet('string');
  return resp.string;
}


window.addEventListener('load', async (event) => {
	const str = await grabString();
	document.getElementById('url-string').innerText = str;
});