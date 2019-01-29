import EventEmitter from 'wolfy87-eventemitter';

/**
 * fetchManager
 * This is for client-side fetch manager designed by window.addEventListener('message', ...)
 * @param {Object} session - session flag object for fetchManager
 * @param {function} checkSessionValid - check session valid or not and then return true/false
 * @param {function} originalFetch - fetch function you will use in application
 */
const fetchManager = (originalFetch, checkSessionValid = () => true) => {
  const eventEmitter = new EventEmitter();
  const eventName = 'PREACTION-DONE';
  return {
    done: () => eventEmitter.emit(eventName),
    fetch: (...args) => {
      if (checkSessionValid()) {
        return originalFetch.apply(this, args);
      }
      return new Promise((res, rej) => {
        const handler = e => {
          if (checkSessionValid()) {
            eventEmitter.removeListener(eventName, handler);
            res(originalFetch.apply(this, args));
          }
        };
        eventEmitter.addListener(eventName, handler);
      });
    },
  };
};

export default fetchManager;
