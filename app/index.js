import Mediator from './scripts/js/Mediator';

window.addEventListener('load', async () => {
    try {
        await (new Mediator().init());
    } catch (e) {
        console.warn(`Failed to initialize app.`, e);
    }
});