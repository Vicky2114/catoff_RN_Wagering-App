const generateFakeGames = (count) => {
    const fakeGames = [];
    const imageWidth = 200; // Adjust width as needed
    const imageHeight = 300; // Adjust height as needed
  
    for (let i = 0; i < count; i++) {
      fakeGames.push({
        title: `Challenge ${i + 1}: ${['Walk', 'Run', 'Cycle'][Math.floor(Math.random() * 3)]}`,
        description: 'Join this exciting challenge and track your progress!',
        wager: Math.floor(Math.random() * 200) - 100,
        amount: Math.floor(Math.random() * 10000),
        creator: `User ${Math.floor(Math.random() * 100)}`,
        joined: `${Math.floor(Math.random() * 50)}/50`,
        totalPlayers: 50,
        startDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
        tags: ['FITNESS', 'CHALLENGE'],
        image: `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`,
      });
    }
  
    return fakeGames;
  };
  
  export default generateFakeGames;
  