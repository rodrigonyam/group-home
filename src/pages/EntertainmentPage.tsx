import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MusicalNoteIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  HomeIcon,
  PuzzlePieceIcon,
  BookOpenIcon,
  TvIcon,
} from '@heroicons/react/24/outline';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  era: string;
}

interface Game {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  icon: string;
}

const EntertainmentPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'music' | 'games' | 'books' | 'tv'>('music');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(75);

  const songs: Song[] = [
    { id: '1', title: 'Fly Me to the Moon', artist: 'Frank Sinatra', duration: '2:28', era: '1950s' },
    { id: '2', title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:21', era: '1960s' },
    { id: '3', title: 'My Way', artist: 'Frank Sinatra', duration: '4:35', era: '1960s' },
    { id: '4', title: 'Moon River', artist: 'Andy Williams', duration: '2:41', era: '1960s' },
    { id: '5', title: 'Blue Moon', artist: 'Billie Holiday', duration: '3:22', era: '1940s' },
    { id: '6', title: 'Somewhere Over the Rainbow', artist: 'Judy Garland', duration: '2:43', era: '1930s' },
  ];

  const games: Game[] = [
    { id: '1', name: 'Word Search', description: 'Find hidden words in a letter grid', difficulty: 'Easy', category: 'Word Games', icon: '🔤' },
    { id: '2', name: 'Crossword Puzzle', description: 'Fill in the crossword with clues', difficulty: 'Medium', category: 'Word Games', icon: '🧩' },
    { id: '3', name: 'Memory Match', description: 'Match pairs of cards', difficulty: 'Easy', category: 'Memory Games', icon: '🃏' },
    { id: '4', name: 'Sudoku', description: 'Number puzzle game', difficulty: 'Hard', category: 'Number Games', icon: '🔢' },
    { id: '5', name: 'Jigsaw Puzzle', description: '100-piece scenic puzzles', difficulty: 'Medium', category: 'Visual Games', icon: '🖼️' },
    { id: '6', name: 'Trivia Quiz', description: 'Questions from your era', difficulty: 'Medium', category: 'Knowledge', icon: '❓' },
  ];

  const books = [
    { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic Fiction' },
    { id: '2', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic Fiction' },
    { id: '3', title: 'Local History Stories', author: 'Various Authors', category: 'History' },
    { id: '4', title: 'Chicken Soup for the Soul', author: 'Jack Canfield', category: 'Inspiration' },
    { id: '5', title: 'Large Print Mysteries', author: 'Agatha Christie', category: 'Mystery' },
    { id: '6', title: 'Gardening Guide', author: 'Martha Stewart', category: 'Hobbies' },
  ];

  const tvShows = [
    { id: '1', title: 'Classic Movies', description: 'Casablanca, Gone with the Wind, and more', category: 'Movies' },
    { id: '2', title: 'Nature Documentaries', description: 'Beautiful wildlife and landscapes', category: 'Documentary' },
    { id: '3', title: 'Old TV Shows', description: 'I Love Lucy, The Andy Griffith Show', category: 'Comedy' },
    { id: '4', title: 'Music Concerts', description: 'Classic performances and concerts', category: 'Music' },
    { id: '5', title: 'Travel Shows', description: 'Explore places around the world', category: 'Travel' },
    { id: '6', title: 'Cooking Shows', description: 'Classic recipes and cooking tips', category: 'Lifestyle' },
  ];

  const playPause = (song?: Song) => {
    if (song && song !== currentSong) {
      setCurrentSong(song);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'music', name: 'Music', icon: MusicalNoteIcon },
    { id: 'games', name: 'Games', icon: PuzzlePieceIcon },
    { id: 'books', name: 'Books', icon: BookOpenIcon },
    { id: 'tv', name: 'TV Shows', icon: TvIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors"
          >
            <HomeIcon className="h-8 w-8" />
          </Link>
          <div>
            <h1 className="text-3xl-senior font-bold text-gray-900 flex items-center">
              <MusicalNoteIcon className="h-10 w-10 mr-3 text-purple-600" />
              Entertainment
            </h1>
            <p className="text-lg-senior text-gray-600">
              Music, games, books, and shows you'll enjoy
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 p-4 rounded-xl transition-colors ${
                  currentTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="h-8 w-8 mx-auto mb-2" />
                <span className="text-lg-senior font-medium">{tab.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Music Tab */}
        {currentTab === 'music' && (
          <div className="space-y-6">
            {/* Now Playing */}
            {currentSong && (
              <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl">
                <h3 className="text-lg-senior font-semibold mb-2">Now Playing</h3>
                <h4 className="text-2xl-senior font-bold mb-1">{currentSong.title}</h4>
                <p className="text-lg-senior mb-4">{currentSong.artist}</p>
                
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                    <BackwardIcon className="h-6 w-6" />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playPause()}
                    className="p-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isPlaying ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
                  </motion.button>
                  <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                    <ForwardIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <SpeakerWaveIcon className="h-5 w-5" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-2 bg-white bg-opacity-30 rounded-full appearance-none slider"
                  />
                  <span className="text-sm-senior">{volume}%</span>
                </div>
              </div>
            )}

            {/* Song List */}
            <div className="space-y-3">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer ${
                    currentSong?.id === song.id ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'
                  }`}
                  onClick={() => playPause(song)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-purple-600 text-white rounded-full"
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <PauseIcon className="h-6 w-6" />
                    ) : (
                      <PlayIcon className="h-6 w-6" />
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg-senior font-semibold text-gray-900">{song.title}</h4>
                    <p className="text-base-senior text-gray-600">{song.artist}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-base-senior text-gray-600">{song.duration}</p>
                    <span className="text-sm-senior text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {song.era}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Games Tab */}
        {currentTab === 'games' && (
          <div className="grid md:grid-cols-2 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{game.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl-senior font-semibold text-gray-900 mb-1">
                      {game.name}
                    </h3>
                    <span className={`text-sm-senior px-3 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-base-senior text-gray-600 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm-senior text-gray-500">{game.category}</span>
                  <button className="btn-primary text-sm px-4 py-2">
                    Play Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Books Tab */}
        {currentTab === 'books' && (
          <div className="grid md:grid-cols-2 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="p-4 bg-blue-600 text-white rounded-xl">
                  <BookOpenIcon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg-senior font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-base-senior text-gray-600">{book.author}</p>
                  <span className="text-sm-senior text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                </div>
                <button className="btn-primary">
                  Read
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* TV Shows Tab */}
        {currentTab === 'tv' && (
          <div className="grid md:grid-cols-2 gap-6">
            {tvShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-red-600 text-white rounded-xl">
                    <TvIcon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl-senior font-semibold text-gray-900 mb-2">
                      {show.title}
                    </h3>
                    <p className="text-base-senior text-gray-600 mb-3">{show.description}</p>
                    <span className="text-sm-senior text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {show.category}
                    </span>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/" className="btn-secondary text-center block">
          <HomeIcon className="h-6 w-6 mx-auto mb-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default EntertainmentPage;