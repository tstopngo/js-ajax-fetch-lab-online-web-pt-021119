const baseURL = 'https://api.github.com';
const user = 'tstopngo';



function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const repo = 'learn-co-curriculum/js-ajax-fetch-lab';
  const url = `${baseURL}/repos/${repo}/forks`;
  //use fetch to fork it!

  fetch(url,{
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(resp => resp.json())
    .then(json => showResults(json));
}

function showResults(repo) {
  //use this function to display the results from forking via the API
  document.getElementById('results').innerHTML = `<a href=${repo.html_url}>
  ${repo.html_url}</a>`;
}

function createIssue() {
  //use this function to create an issue based on the values input in index.html
  const repo = 'js-ajax-fetch-lab'
  const url = `${baseURL}/repos/${user}/${repo}/issues`
  const postData = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(resp => resp.json())
    .then(json => getIssues());
}

function getIssues(){
  //once an issue is submitted, fetch all open issues to see the issues you are creating
  const repo = 'js-ajax-fetch-lab'
  const url = `${baseURL}/repos/${user}/${repo}/issues`

  fetch(url, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(resp => resp.json())
  .then(json => listIssues(json));
}

function listIssues(issues){
  const issueList = `<ul>
                        ${issues.map(issue =>
                          '<li>'+
                          issue.title +
                          ' - '  +
                          issue.body +
                          '</li>').join('')
                          }
                    </ul>`;

  document.getElementById('issues').innerHTML = issueList
}
