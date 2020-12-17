function imageEmbed({ url, title, id, tags }) {
  let footerText = id;
  
  if (tags && tags[0] != null) {
    footerText += " | " + tags.map(tag => `#${tag}`).join(" ");

    if (footerText.length > 50) {
      footerText = footerText.slice(0, 50) + "...";
    }
  }

  return {
    embed: {
      color: 6316132,
      author: {
        name: title
      },
      image: {
        url
      },
      footer: {
        text: footerText
      }
    }
  };
}

module.exports = imageEmbed;
