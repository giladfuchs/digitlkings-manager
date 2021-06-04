const Profile = require("../models/profiles.model");
const { spawn } = require("child_process");

// const { errorPassword401, error404, error422 } = require("../../utils/error/dbErrorHandler");
// const { createToken, mail } = require("../helper/helper.controller");

const bcrypt = require("bcrypt");

const runPythonScript = async (res, python) => {
    var dataToSend;

    python.stdout.on("data", function (data) {
        console.log("Pipe data from python script ...");
        dataToSend = data.toString().split("\n");
        dataToSend = dataToSend[dataToSend.length - 2];
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.status(200).json({ message: dataToSend });
    });
};

exports.addTarget = async (req, res, next) => {
    var dataToSend;
    console.log(req.body.username, "node");
    // spawn new child process to call the python script
    const python = spawn("python3", [
        "/home/gilad/Desktop/instaking/Front/Targets.py",
        // "/home/gilad/Desktop/digitlkings-manager-master/server/controller/admin/script1.py",
        req.body.username
    ]);

    // collect data from script
    python.stdout.on("data", function (data) {
        console.log("Pipe data from python script ...");
        dataToSend = data.toString().split("\n");
        dataToSend = dataToSend[dataToSend.length - 2];
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend);
        res.status(200).json({ message: dataToSend });
    });
};

exports.readTargetFromApiAndAddForUser = async (req, res, next) => {
    // spawn new child process to call the python script
    console.log(req.body);
    const python = spawn("python3", [
        "/home/gilad/Desktop/instaking/Front/addTargetForUser.py",
        req.body.user_id,
        req.body.targets
    ]);
    runPythonScript(res, python);
    // collect data from script
};

exports.getAllProfile = async (req, res, next) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn("python3", [
        "/home/gilad/PycharmProjects/pythonProject1/instaking/Front/Targets.py",
        req.body.username
        // "/home/gilad/Desktop/node_js/digtalkings/server/controller/admin/script1.py",
    ]);
    // collect data from script
    python.stdout.on("data", function (data) {
        console.log("Pipe data from python script ...");
        dataToSend = data.toString().split("\n");
        dataToSend = dataToSend[dataToSend.length - 2];
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.status(200).json({ message: dataToSend });
    });
    // in close event we are sure that stream is from child process is closed
};
