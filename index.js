const fs = require('fs');

function escapeForCSV(str) {
  return '"' + str.replace(/"/g, '""') + '"';
}


fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const records = data.replace(/^\s*$(?:\r\n?|\n)/gm, "").split('---');
    
    const csvData = ['url,username,password,extra,name']  

    records.forEach(record => {
      const recordWithoutNewLines = record.replace(/(^[ \t]*\n)/gm, "");
      if (!recordWithoutNewLines) return;
      const [websiteName, websiteURL, loginName, login, password, comment] = recordWithoutNewLines.split('\n');
      const csvRecord = [
        escapeForCSV((websiteURL || '').replace('Website URL: ', '')),
        escapeForCSV((login || '').replace('Login: ', '')),
        escapeForCSV((password || '').replace('Password: ', '')),
        escapeForCSV((comment || '').replace('Comment: ', '')),
        escapeForCSV((websiteName || '').replace('Website name: ', ''))
      ];
      csvData.push(csvRecord.join(','));
    });

    fs.writeFile('output.csv', csvData.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Conversion successful! Output written to output.csv');
    });
});
