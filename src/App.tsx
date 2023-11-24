
import { useWritable } from 'react-store-js';
import Card from './Card';
import { StateMachineState, stateMachine } from './stateMachine';
import { recordStore } from './recordStore';
import { subscribeCardSelect, unsubscribeCardSelect } from './customEvents';
import { useEffect } from 'react';
import BigWin from './BigWin';

function App() {
  const $stateMachine = useWritable<StateMachineState>(stateMachine);
  const $recordStore = useWritable<number | undefined>(recordStore);

  useEffect(() => {
    const handler = (event: CustomEvent) => stateMachine.transition(event.detail);

    subscribeCardSelect(handler);
    return (() => {
      unsubscribeCardSelect(handler);
    })
  }, []);

  const newGame = () => stateMachine.reset();

  return (
    <main>
      <div className="to-center">
        <button onClick={newGame} id="new-game-button">New Game</button>
        <span id="steps-label" className="info">steps: {$stateMachine.value.steps}</span>
        {$recordStore.value && <span className="info">best: {$recordStore.value}</span>}
        {!$stateMachine.value.isEnded &&
          <div className="box-container">
            {$stateMachine.value.cardData.map(card =>
              <Card key={card.idx} data={card} clickable={$stateMachine.value.isClickable} />
            )}
          </div>
        }
        {$stateMachine.value.isEnded && <BigWin/>}
      </div>
    </main>
  )
}

export default App
