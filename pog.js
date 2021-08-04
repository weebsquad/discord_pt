const grabString = async () => {
  const response = await fetch('https://discord.pt/string');
  const myJson = await response.json(); //extract JSON from the http response
  console.log('string', myJson);
  return myJson.string;
}

window.addEventListener('load', async (event) => {
    console.log('The page has fully loaded');
	const str = await grabString();
	document.getElementById('url-string').setAttribute('textContent', str);
});