import type { Component } from 'solid-js';
import { For, createSignal } from 'solid-js';

import styles from './App.module.css';

const min = new Date('1/1/1700');
const max = new Date('12/31/2099');

function getRandomDate(min: Date, max: Date) {
  return new Date(
    min.valueOf() + Math.floor(Math.random() * (max.valueOf() - min.valueOf()))
  );
}

const App: Component = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  type Status = 'right' | 'wrong' | 'default';

  const [status, setStatus] = createSignal<Status>('default');
  const [wrong, setWrong] = createSignal<number>(0);
  const [right, setRight] = createSignal<number>(0);
  const [date, setDate] = createSignal<Date>(getRandomDate(min, max));

  function check(question: Date, answer: number) {
    if (answer === question.getDay()) {
      if (status() === 'default') {
        setRight(right() + 1);
      }
      setStatus('right');
      setTimeout(() => {
        setStatus('default');
        setDate(getRandomDate(min, max));
      }, 2000);
    } else {
      setStatus('wrong');
      setWrong(wrong() + 1);
    }
  }

  return (
    <div class={styles.App}>
      <h2
        style={`color: ${
          status() === 'right'
            ? 'green'
            : status() === 'wrong'
            ? 'red'
            : 'black'
        } `}
      >
        {date().toLocaleDateString()}
      </h2>
      {
        <For each={days} fallback={<div>nothin</div>}>
          {(item, index) => (
            <button onClick={() => check.call(this, date(), index())}>
              {item}
            </button>
          )}
        </For>
      }
      <h3>
        Right: {right()} Wrong: {wrong()}
      </h3>
    </div>
  );
};

export default App;
