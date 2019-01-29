import EventEmitter from 'wolfy87-eventemitter';

/**
 * fetchManager
 * This is for client-side fetch manager designed by window.addEventListener('message', ...)
 * @param {function} originalFetch - fetch function you will use in application
 * @param {function} preAction - check session valid or not and then return true/false
 */

const fetchManager = (originalFetch, pendFetch = () => true) => {
  const eventEmitter = new EventEmitter();
  const eventName = 'PREACTION-DONE';
  return {
    perform: () => eventEmitter.emit(eventName),
    fetch: (...args) => {
      if (!pendFetch()) {
        return originalFetch(args);
      }

      return new Promise((res, rej) => {
        const handler = e => {
          res(originalFetch(args));
        };

        eventEmitter.once(eventName, handler);
      });
    }
  };
};

export default fetchManager;
