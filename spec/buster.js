var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: [
        "lib/jquery-1.7.2.js",
    ],
    src: ["extendable.js"],
    specs: ["spec/*-spec.js"]
};
