// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  // const commands = Object.keys(bin);
  // var c = '';
  // for (let i = 1; i <= commands.length; i++) {
  //   if (i % 7 === 0) {
  //     c += commands[i - 1] + '\n';
  //   } else {
  //     c += commands[i - 1] + ' ';
  //   }
  // }

  const c = `----------------
|   Contact    |
----------------
email     - open mailto:${config.email}
github    - open github profile
linkedin  - open linkedin profile

----------------
|   About Me   |
----------------
about     - more about me
resume    - open resume
donate    - support my work
sumfetch  - display summary
banner    - display a cool banner
projects  - display github projects

----------------
| Fun Commands |
----------------
echo      - echo arguments
whoami    - display username
ls        - list directories
cd        - change directory
date      - display current date
sudo      - elevate privileges
quote     - display random quote
weather   - display weather

----------------
|   Other      |
----------------
repo      - open github repo
help      - display this help message
`;

  return `Welcome! Here are all the available commands:
${c}
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}.

${config['about']}

More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export default about;

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest.
here are the ways you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.buymeacoffee}" target="_blank">buymeacoffee</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

// export const vi = async (args: string[]): Promise<string> => {
//   return `woah, you still use 'vi'? just try 'vim'.`;
// };

// export const vim = async (args: string[]): Promise<string> => {
//   return `'vim' is so outdated. how about 'nvim'?`;
// };

// export const nvim = async (args: string[]): Promise<string> => {
//   return `'nvim'? too fancy. why not 'emacs'?`;
// };

// export const emacs = async (args?: string[]): Promise<string> => {
//   return `you know what? just use vscode.`;
// };

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `

  ░█████╗░██╗░░██╗███╗░░░███╗███████╗██████╗░  ░██████╗░█████╗░███████╗██████╗░
  ██╔══██╗██║░░██║████╗░████║██╔════╝██╔══██╗  ██╔════╝██╔══██╗██╔════╝██╔══██╗
  ███████║███████║██╔████╔██║█████╗░░██║░░██║  ╚█████╗░███████║█████╗░░██║░░██║
  ██╔══██║██╔══██║██║╚██╔╝██║██╔══╝░░██║░░██║  ░╚═══██╗██╔══██║██╔══╝░░██║░░██║
  ██║░░██║██║░░██║██║░╚═╝░██║███████╗██████╔╝  ██████╔╝██║░░██║███████╗██████╔╝
  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝╚═════╝░  ╚═════╝░╚═╝░░╚═╝╚══════╝╚═════╝░


Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
