const mineflayer = require("mineflayer");
const gui = require("mineflayer-gui");
const crypto = require("crypto");
const { Worker, isMainThread, parentPort } = require("worker_threads");

// Список серверов
const servers = [{ host: "luckymc.ru", port: 25565 }, { host: "topbars.ru", port: 25565 }, { host: "mcfunny.su", port: 25565 }, { host: "lastmc.ru", port: 25565 }, { host: "supermc.su", port: 25565 }, { host: "sunnymc.su", port: 25565 }, { host: "best.playmine.org", port: 25565 }, { host: "mc.topmine.su", port: 25565 }];

const messages = [
    "Читер в Minecraft так сильно запутался в своих командах, что начал строить дом из красного камня, думая, что это деревянный.",
    "Читер в Minecraft включил летание, но так сильно начал летать, что забыл, как приземлиться.",
    "Читер в Minecraft решил добывать ресурсы в креативе, но случайно заспаунил всех мобов на сервере.",
    "Читер в Minecraft купил себе чит, а его антивирус закрыл все серверы.",
    "Читер в Minecraft пытался сделать невидимость, но забыл, что его имя по-прежнему видят.",
    "Читер в Minecraft купил себе читы и обнаружил, что на сервере все еще нет разрешения для читеров.",
    "Читер в Minecraft пытался летать, но его привязали к спауну, и теперь он не может улететь.",
    "Читер в Minecraft включил авто-строительство, но случайно построил себе ловушку.",
    "Читер в Minecraft так увлекся использованием читов, что теперь его можно найти только в меню настроек.",
    "Читер в Minecraft попытался использовать моды, но моды тоже начали его модифицировать.",
    "Читер в Minecraft включил бессмертие, но не заметил, как его убил баг.",
    "Читер пытался использовать блоки на ускоренной скорости, но вместо этого построил себе вечную лестницу в ад.",
    "Читер в Minecraft надел броню из креатива, но забыл про невидимость, и теперь все его друзья считают его призраком.",
    "Читер в Minecraft включил режим полета, но вылетел из игры по ошибке.",
    "Читер в Minecraft включил ультра-ускорение, но теперь он не может найти свою базу.",
    "Читер в Minecraft так много использует читы, что теперь его персонаж забыл, как быть обычным игроком.",
    "Читер в Minecraft пробовал дать себе миллион алмазов, но случайно уронил сервер.",
    "Читер в Minecraft пытался сгенерировать себе идеальный мир, но вместо этого он получил пустую карту.",
    "Читер в Minecraft включил авто-сбор ресурсов, но собрал только свою голову.",
    "Читер в Minecraft использовал команду /kill, но убил весь сервер.",
    "Читер в Minecraft летал, пока не врезался в невидимую стену, созданную его же читами.",
    "Читер в Minecraft захотел автоматизировать добычу алмазов, а получилось, что он стал копать сам себя.",
    "Читер в Minecraft использовал x-ray, чтобы найти сокровища, но вместо них он наткнулся на свою собственную смерть.",
    "Читер в Minecraft решил стать невидимым, но так и не понял, что его звуки всё ещё слышны.",
    "Читер в Minecraft построил бесконечный лабиринт, но забыл, как из него выйти.",
    "Читер в Minecraft решил использовать боты для крафта, но они создали такой бардак, что теперь ему нужно разбирать всё вручную.",
    "Читер в Minecraft попытался ускорить добычу, но стал копать дырки в мире вместо ресурсов.",
    "Читер в Minecraft пытался создать супероружие, а создал просто баг, который не работает.",
    "Читер в Minecraft стал невидимым, но все его следы всё равно видны.",
    "Читер в Minecraft решил взломать сервер, но вместо этого взломал свой собственный компьютер.",
    "Читер в Minecraft стал супербыстрым, но теперь не может остановиться.",
    "Читер в Minecraft использовал бессмертие, но умер от скуки.",
    "Читер в Minecraft так увлекся модами, что забыл, как играть без них.",
    "Читер в Minecraft включил автоматическое построение дома, но получил только кучу дёрна.",
    "Читер в Minecraft подумал, что он стал непобедимым, пока его не убил обычный моб.",
    "Читер в Minecraft включил бесконечный голод, но забыл про свои запасы еды.",
    "Читер в Minecraft пытался использовать карту для поиска сокровищ, но наткнулся только на пустую землю.",
    "Читер в Minecraft пытался сделать свою базу невидимой, но забыл о том, что её видно на мини-карте.",
    "Читер в Minecraft решил улучшить игру, но теперь все его друзья считают его человеком-пауком.",
    "Читер в Minecraft пытался изменить погоду, но случайно вызвал ураган.",
    "Читер в Minecraft включил ультра-ускорение и теперь не может найти свою базу.",
    "Читер в Minecraft решил использовать чит на огромный инвентарь, но теперь его вещи никто не может найти.",
    "Читер в Minecraft поставил телепорт на любую точку мира, но всегда попадает в лаву.",
    "Читер в Minecraft попытался изменить свой внешний вид, но его персонаж превратился в слизня.",
    "Читер в Minecraft включил режим выживания с бессмертием, но забыл, что у него нет инструментов.",
    "Читер в Minecraft так сильно увлекся использованием команд, что случайно построил мост в пустоту.",
    "Читер в Minecraft пытался найти тайную базу с помощью читов, но вместо этого упал в подземелье.",
    "Читер в Minecraft пытался создать себе вечный день, но день стал таким длинным, что он уснул.",
    "Читер в Minecraft включил мод на увеличение размера карты, но забыл, что сам не может выйти за её пределы.",
    "Читер в Minecraft взял читы для добычи, но в итоге забыл, как пользоваться киркой.",
    "Читер в Minecraft решил улучшить свой инвентарь, но теперь у него нет места для брони.",
    "Читер в Minecraft пытался ускорить процесс роста деревьев, но они начали расти прямо в его дом.",
    "Читер в Minecraft построил себе огромную крепость, но забыл поставить двери.",
    "Читер в Minecraft стал суперсильным, но забыл, что ему некуда класть добытые ресурсы.",
    "Читер в Minecraft попытался использовать команду для ускорения времени, но теперь всегда ночь.",
    "Читер в Minecraft решил попробовать моды на магию, но его персонаж стал магом, который не может кастовать заклинания.",
    "Читер в Minecraft захотел включить бессмертие, но теперь его единственный враг — его собственные читы.",
    "Читер в Minecraft решил использовать читы на оседлых животных, но осел отказался ехать.",
    "Читер в Minecraft поставил мод на улучшенные звуки, но теперь его персонаж не может слышать звуки игры.",
    "Читер в Minecraft решил ускорить время ночи, но теперь он не успевает пережить ночные атаки мобов."
];

// Функция для генерации случайного ника из 7 символов
function generateRandomUsername() {
  return crypto.randomBytes(4).toString("hex").slice(0, 4);
}

// Функция для создания и запуска бота
function createBot(server) {
  const username = generateRandomUsername();
  console.log(
    `Запуск бота с ником: ${username} на сервере ${server.host}:${server.port}`
  );

  const bot = mineflayer.createBot({
    host: server.host,
    port: server.port,
    username: 'PidorClient_' + username,
    auth: "offline",
    version: "1.20",
    physicsEnabled: false,
  });

  bot.loadPlugin(gui.plugin);

  let messageCount = 0;
  let capchaPassed = false;
  let onBW = false;

  bot.on("message", (jsonMsg) => {
    let message = jsonMsg.json.extra.map((item) => item.text).join("");
    console.log(`[${server.host}] ${message}`);

    if (message.includes("⟹ Идет проверка, пожалуйста, подождите...")) {
      messageCount++;
      if (!bot.physicsEnabled && messageCount === 4) {
        bot.look(bot.entity.yaw + 22.23121, bot.entity.pitch + 42.3465);
        bot.physicsEnabled = true;
        bot.physics.gravity = 0.08;
      }
    }

    if (
      message.includes("Вы находитесь в Лобби") ||
      message.includes("Вы успешно вошли!")
    ) {
      capchaPassed = true;
      gotobedwars();
    }

    if (message.includes("Подключение к серверу bwlobby")) {
      onBW = true;
      sendMessages(messages);
    }
  });

  async function gotobedwars() {
    if (capchaPassed) {
      bot.chat("/reg _1234_ _1234_");
      bot.chat("/login _1234_");
      setTimeout(() => {
        bot.chat("/menu");
      }, 1000);

      bot.once("windowOpen", async (window) => {
        try {
          let bedSlot = window.slots.findIndex(
            (item) => item && item.name === "red_bed"
          );

          if (bedSlot !== -1) {
            console.log("Red bed found, clicking on it...");
            await bot.clickWindow(bedSlot, 0, 0);
            return;
          }

          console.log("Red bed not found, searching for pufferfish...");
          const pufferfishSlot = window.slots.findIndex(
            (item) => item && item.name === "pufferfish"
          );
          if (pufferfishSlot === -1)
            throw new Error("Pufferfish not found in menu");

          await bot.clickWindow(pufferfishSlot, 0, 0);

          bot.once("windowOpen", async (window) => {
            bedSlot = window.slots.findIndex(
              (item) => item && item.name === "red_bed"
            );
            if (bedSlot === -1)
              throw new Error("Red bed not found after clicking pufferfish");

            console.log(
              "Red bed found after clicking pufferfish, clicking on it..."
            );
            await bot.clickWindow(bedSlot, 0, 0);
          });
        } catch (err) {
          console.error("Error in gotobedwars:", err);
        }
      });
    }
  }

  function sendMessages(messages) {
    let index = 0;

    function sendNextMessage() {
      if (index < messages.length) {
        bot.chat(`${messages[index]} ${generateRandomUsername()}`);
        index++;
        if (index >= messages.length) {
          index = 0;
        }
        setTimeout(sendNextMessage, 5000);
      }
    }

    sendNextMessage();
  }

  bot.on("kicked", (reason) => {
    console.log(`[${server.host}] Bot kicked: ${reason}`);
  });
}

function startBotsInWorkerWithDelay(server, delay) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename);

    worker.on("message", (message) => {
      console.log("Bot started in worker:", message);
    });

    worker.on("error", (error) => {
      console.error("Error in worker:", error);
      reject(error);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
      resolve();
    });

    worker.postMessage(server);
  });
}

// Главная часть программы
if (isMainThread) {
  // Запуск 3 ботов на каждом сервере с задержкой между ними
  servers.forEach((server) => {
    let botCount = 0;

    // Функция для запуска 3 ботов с задержкой между ними
    const launchBots = () => {
      if (botCount < 3) {
        startBotsInWorkerWithDelay(server, 7232)
          .then(() => {
            console.log(
              `Bot #${botCount + 1} started on server ${server.host}`
            );
            botCount++;
            setTimeout(launchBots, 7232); // Задержка 7.232 секунды
          })
          .catch((err) => {
            console.error("Error starting bot:", err);
          });
      }
    };

    // Запуск ботов с задержкой
    launchBots();
  });
} else {
  // Запуск бота в worker
  parentPort.once("message", (server) => {
    createBot(server);
  });
}
