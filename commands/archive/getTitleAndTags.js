function getTitleAndTags(args) {
  let title = "";
  const tags = [];
  let endOfTitle = false;
  let i = 0;

  if (RegExp(/^https:.+$/).test(args[0])) {
    i = 1;
  }

  for (i; i < args.length; i++) {
    let word = args[i];

    if (word[0] !== "#" && !endOfTitle) {
      title += `${word} `;
    } else if (word[0] === "#") {
      endOfTitle = true;
      const newTag = word.slice(1);

      if (RegExp(/^[A-z|\d]+$/).test(newTag)) {
        tags.push(newTag);
      }
    }
  }

  if (title.length > 80) {
    title = title.slice(0, 80);
  }
  title.trim();

  return { title, tags };
}

module.exports = getTitleAndTags;
