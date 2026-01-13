export default function GameTab({
  gameComponents,
  activeGame,
  setActiveGame
}) {
  return (
    <div className="space-y-8">
      {/* Pilihan Game */}
      <div className="grid md:grid-cols-3 gap-4">
        {gameComponents.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`p-5 rounded-2xl text-left border transition
              ${
                activeGame === game.id
                  ? 'bg-[#355485] text-white'
                  : 'bg-white hover:bg-blue-50'
              }`}
          >
            <div className="text-3xl mb-2">{game.icon}</div>
            <h3 className="font-bold">{game.title}</h3>
            <p className="text-sm opacity-80">{game.subMateri}</p>
          </button>
        ))}
      </div>

      {/* Area Game */}
      <div>
        {gameComponents.find(g => g.id === activeGame)?.component}
      </div>
    </div>
  );
}
