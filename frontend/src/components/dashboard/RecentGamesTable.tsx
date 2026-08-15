import React, { useState } from 'react';
import { SAMPLE_GAMES } from '../../lib/sample-games';
import { History, Search, Filter, Play, ExternalLink, ShieldAlert } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Badge } from '../ui/Badge';

export const RecentGamesTable: React.FC = () => {
  const { loadGame, activeGame } = useGame();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredGames = SAMPLE_GAMES.filter((game) => {
    const matchesSearch =
      game.opponent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.resultReason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || game.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <History className="w-4 h-4 text-forest-800" />
            Recent Game History
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any match to load complete move timeline into the interactive board
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search opponent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 w-36 sm:w-44"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 text-slate-700 bg-white font-semibold"
          >
            <option value="all">All Modes</option>
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
            <option value="classical">Classical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Opponent</th>
              <th className="py-3 px-4">Time Control</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Result</th>
              <th className="py-3 px-4">Accuracy</th>
              <th className="py-3 px-4">Rating Change</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredGames.map((game) => {
              const isActive = activeGame.id === game.id;
              return (
                <tr
                  key={game.id}
                  className={`hover:bg-gold-50/40 transition-colors ${
                    isActive ? 'bg-gold-50/60 font-semibold' : ''
                  }`}
                >
                  {/* Opponent */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {game.opponent.avatar ? (
                        <img
                          src={game.opponent.avatar}
                          alt={game.opponent.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                          {game.opponent.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{game.opponent.name}</span>
                          {game.opponent.title && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-100 text-rose-800">
                              {game.opponent.title}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {game.opponent.rating} ELO
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Time Control */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-slate-700">{game.timeControl}</span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-slate-500">{game.date}</td>

                  {/* Result */}
                  <td className="py-3.5 px-4">
                    {game.result === 'win' && <Badge variant="emerald">WIN ({game.resultReason})</Badge>}
                    {game.result === 'loss' && <Badge variant="rose">LOSS ({game.resultReason})</Badge>}
                    {game.result === 'draw' && <Badge variant="gold">DRAW ({game.resultReason})</Badge>}
                  </td>

                  {/* Accuracy */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {game.playerAccuracy}%
                  </td>

                  {/* Rating Change */}
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {game.ratingChange > 0 ? (
                      <span className="text-emerald-600">+{game.ratingChange}</span>
                    ) : game.ratingChange < 0 ? (
                      <span className="text-rose-600">{game.ratingChange}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>

                  {/* Review Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => loadGame(game)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ml-auto ${
                        isActive
                          ? 'bg-forest-900 text-gold-300'
                          : 'bg-slate-100 hover:bg-forest-900 text-slate-700 hover:text-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isActive ? 'Analyzing' : 'Review Game'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
