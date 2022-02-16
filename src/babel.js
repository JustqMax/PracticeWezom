async function start() { // тест переваривания babel-ем async-await в код, который читается всеми браузерами
    return await Promise.resolve('testAsync');
}

start().then(console.log);

class Util {
    static id = Date.now()
}

console.log('Util Id:', Util.id)