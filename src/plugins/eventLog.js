const eventLog = [];

eventLog.push = (event, value) => {
    eventLog[eventLog.length] = {
        event,
        dateAt: Date(),
        state: value
    }
};

export default eventLog;