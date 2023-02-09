// Remove the first child of the body element
document.body.removeChild(document.body.firstChild);

// Set the body innerHTML to a table containing two iframes
document.body.innerHTML = `
  <table>
    <tr>
      <td>
        <iframe style='width:600px;height:1200px' id='cf1' src='https://chat.openai.com/chat/36327d80-e9a4-4cd2-a4e7-4323cf4f05c8'></iframe>
      </td>
      <td>
        <iframe style='width:600px;height:1200px' id='cf2' src='https://chat.openai.com/chat/1aa8ab10-2e0a-4856-8d83-7b77a4471567'></iframe>
      </td>
    </tr>
  </table>
`;

// Wait for the iframes to load
await new Promise(r => setTimeout(r, 10000));

// Get references to the iframes and their elements
const f1 = document.getElementById("cf1");
const f2 = document.getElementById("cf2");

const c1t = f1.contentDocument.querySelector("textArea");
const c1b = f1.contentDocument.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent")[0];
const c2t = f2.contentDocument.querySelector("textArea");
const c2b = f2.contentDocument.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent")[0];
const r1 = f1.contentDocument.getElementsByClassName("w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]");
const r2 = f2.contentDocument.getElementsByClassName("w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]");

// Variables to store the previous responses
let q1 = "";
let q2 = "";

// The chat function
async function chat(text) {
  // Send a message to the first chat
  c1t.value = text;
  c1b.click();

  // Wait for a response
  await new Promise(r => setTimeout(r, 20000));

  // Get the response
  const response = Array.from(r1[r1.length - 1].children[0].children[1].children[0].children[0].children[0].children).slice(-1)[0].textContent;

// Store the response if it's not the same as the previous response from the second chat
if (response !== q2) {
q1 = response;
} else {
q1 = "Hazme una pregunta no personal al azar.";
}

// Send the response to the second chat
c2t.value = "Responda lo siguiente y luego hágame una pregunta al azar." + q1;
c2b.click();

// Wait for a response from the second chat
await new Promise(r => setTimeout(r, 20000));

// Get the response from the second chat
q2 = Array.from(r2[r2.length - 1].children[0].children[1].children[0].children[0].children[0].children).slice(-1)[0].textContent;

// Schedule the next chat after 5 seconds
setTimeout(() => chat("Responda lo siguiente y luego hágame una pregunta no personal al azar:" + q2), 5000);
}

// Start the chat with the first message
chat("Hazme una pregunta no personal al azar.");
