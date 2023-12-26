// // List of commands that require API calls

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getWeather } from '../api';
import config from '../../../config.json';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  const max_len = 60;

  const terminal_ref = document.getElementsByClassName('terminal-width')[0];
  const element_width = terminal_ref.clientWidth;
  const fontSize = parseInt(window.getComputedStyle(terminal_ref)['font-size']);
  const terminal_width = Math.floor(element_width / (fontSize / 1.64));

  function padAndTruncateString(input: string, maxLen: number, paddingChar: string = ' ', tag: string = ''): string {
    if (input.length === maxLen) {
      return (tag ? `<${tag}>` + input + `</${tag}>` : input); // No need to pad or truncate if the string is already at the desired length
    } else if (input.length < maxLen) {
      return (tag ? `<${tag}>` + input + `</${tag}>` : input).padEnd(maxLen + (tag ? tag.length * 2 + 5 : 0), paddingChar); // Pad the string if it's shorter
    } else {
      return (tag ? `<${tag}>` + input.slice(0, maxLen - 3) + '...' + `</${tag}>` : input.slice(0, maxLen - 3) + '...'); // Truncate the string if it's longer
    }
  }

  function createCard(repo: any) {
    const repo_name = `<a class="text-light-blue dark:text-dark-blue" href="${repo.html_url}" target="_blank">${padAndTruncateString(repo.name, max_len - 16)}</a>`;
    const repo_desc = `<span title="${repo.description ? repo.description : 'No description'}">${padAndTruncateString(repo.description ? repo.description : 'No description', max_len - 16)}</span>`;
    const repo_lang = padAndTruncateString(repo.language ? repo.language : 'Unknown', max_len - 16);
    const repo_updated = padAndTruncateString(new Date(repo.updated_at).toLocaleDateString(), max_len - 16);
    const repo_stars = padAndTruncateString(String(repo.stargazers_count), max_len - 16);
    const repo_forks = padAndTruncateString(String(repo.forks_count), max_len - 16);
    const repo_issues = padAndTruncateString(String(repo.open_issues_count), max_len - 16);
    const repo_url = `<a class="text-light-blue dark:text-dark-blue underline-description" href="${repo.html_url}" target="_blank">${padAndTruncateString(repo.html_url, max_len - 16, ' ', 'span')}</a>`;

    return `${''.padEnd(max_len + 1, '-')}
| Repository:   ${repo_name}|
|${''.padEnd(max_len - 1, '-')}|
| Desc:         ${repo_desc}|
| Lang:         ${repo_lang}|
| Last Update:  ${repo_updated}|
| Stars:        ${repo_stars}|
| Forks:        ${repo_forks}|
| Issues:       ${repo_issues}|
| URL:          ${repo_url}|
${''.padEnd(max_len + 1, '-')}`
  }

  function combineCards(cards: string[], n: number): string {
    const combinedCards: string[] = [];
    const numLines = cards[0].split('\n').length;

    for (let k = 0; k < cards.length; k += n) {
      for (let i = 0; i < numLines; i++) {
        let combinedLine = '';
        for (let j = k; j < k + n && j < cards.length; j++) {
          const cardLines = cards[j].split('\n');
          combinedLine += cardLines[i].trim() + ' ';
        }
        combinedCards.push(combinedLine.trim());
      }
    }

    return combinedCards.join('\n');
  }

  const nCardsLine = Math.floor(terminal_width / (max_len + 1));

  const otherCards = combineCards(
    projects
      .filter((repo) => {
        return !config['top_repos'].includes(repo.name);
      })
      .sort((a, b) => {
        return (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count);
      })
      .slice(0, nCardsLine * 1).map((repo) => createCard(repo)), nCardsLine);

  console.log(config['top_repos']);

  const topCards = combineCards(projects.filter((repo) => {
    return config['top_repos'].includes(repo.name);
  }).map((repo) => createCard(repo)), nCardsLine);

  const showMore = `<a class="text-light-blue dark:text-dark-blue underline" href="https://github.com/Ahmedsaed?tab=repositories" target="_blank">Show More</a>`;

  return `----------------------
|      Top Picks     |
----------------------
${topCards}
----------------------
|   Other Projects   |
----------------------
${otherCards}
----------------------
|      ${showMore}     |
----------------------
`;
}

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await getWeather(city);
  const weatherLines = weather.split('\n');
  return weatherLines.slice(0, weatherLines.length - 3).join('\n');;
};
