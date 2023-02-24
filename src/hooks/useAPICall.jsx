
const constructPrompt = (config) => {
    const cmd = config.prompt;
    let cmdPieces = cmd.split('--');
    cmdPieces = cmdPieces.map(x => x.trim());
    console.log(cmdPieces);
    const cmdKey = cmdPieces[0];

    let input = '';

    switch(cmdKey){
        case "getcode":
            const lang = cmdPieces.length > 2 ? cmdPieces[2] : config.language;
            input = `Give me the code for ${cmdPieces[1]} in ${lang} programming language`;
            break;
        case "refactor":
            input = `Refactor the following code to make it clean and more production friendly : \n ${config.code}`;
            break;
        case "debug":
            input = `Debug the following code : \n${config.code}`;
            break;
        case "scrutinize":
            input = `Scrutinize the following code and identify fixes and vulnerabilities\n${config.code}`;
            break;
        case "complete":
            input = `Complete the below code to ${cmdPieces.length > 1 ? cmdPieces[1] : 'to achieve its goal'} : \n${config.code}`;
            break;
        case "docs":
            const method = cmdPieces.length > 1 ? cmdPieces[1] : 'function';
            const language = cmdPieces.length > 2 ? cmdPieces[2] : config.language;
            input = `Describe the ${method} method/function of ${language} programming language with code snippet and description`
            break;
    }

    return input;
}



export const useApiCall =  () => {
    
    return (config) => {
        // const API_KEY = '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';
        const API_KEY = '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';

        const ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    
        const input = `${constructPrompt(config)}`;
        // const input = `${constructPrompt(config)}. Return the response in markup format`;

        const params = {
        "prompt": input,
        "temperature": 0.5,
        "max_tokens": 500,
        // "n": 
        // "stop": ["\n"]
        };
    
        // Defining the headers
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
        };

        console.log(input);
    
        return new Promise((resolve, reject) => {
            fetch(ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "prompt": input,
                "max_tokens": params.max_tokens,
                "temperature": params.temperature,
                // "top_p": params.top_p,
                // "frequency_penalty": params.frequency_penalty,
                // "presence_penalty": params.presence_penalty,
                // "stop": params.stop
            })
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        });

    }
}
        
