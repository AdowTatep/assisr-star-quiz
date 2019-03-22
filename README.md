<p align="center">
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
			 alt="Gitmoji">
	</a>
</p>

# assisr-start-quiz

Do you like star wars? Test yourself with this quiz!

This is a fun project made using the https://swapi.co/.

You have 2 minutes to correctly answer character names from star wars
- Score 10 points if you answer without reading the tip
- Score 5 points if you answer with the tip

## **How much points can you get? ⚔️**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using ``--typescript`` argument.

## How to run

**First you need to get the credentials, follow the "Credentials" topic below.**

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Credentials:
Two credentials are required for the google search to work.
- First you need to visit: https://developers.google.com/custom-search/v1/overview and click on the "Get a key" button
- Second you'll need a custom search engine id, for that you can visit: https://cse.google.com/cse, put "google.com" on the website box and then proceed with the creation. Then check the "Image search" and "Search the entire web" and copy the "Search engine ID" field.
- Third, I am also using bing as an option, so you have to go to the azure portal and create a "Bing Search v7" resource, after you created it, go to its options and copy one of its "keys", if you don't know how, check out: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account.

Then create the following file:
```./src/AssirStarQuiz/Credentials.json```
```json
{
    "googleImagesContext": "SEARCH_ENGINE_ID",
	"googleImagesApiKey": "API_KEY",
    "bingSubscriptionKey": "BING_SEARCH_KEY"
}
```


## Attributions:
- Font: [Star Jedi by Boba Fonts(Free to use)](https://www.dafont.com/star-jedi.font)  
- Sound: [Darth vader by Alexander(CC BY-NC 4.0)](http://www.orangefreesounds.com/darth-vader-breathing/)
