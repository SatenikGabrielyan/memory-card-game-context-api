import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GameProvider } from "./context/GameContext"
import GameScreen from "./components/GameScreen"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <div className="app">
          <GameScreen />
        </div>
      </GameProvider>
    </QueryClientProvider>
  )
}

export default App