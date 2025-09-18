const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('FFmpeg API is running!');
});

// A simple endpoint to check the FFmpeg version
app.get('/transcode', (req, res) => {
    // This is a placeholder command. In a real app, you would process
    // an uploaded file.
    const ffmpegCommand = 'ffmpeg -version';

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ffmpeg: ${error.message}`);
            return res.status(500).send(`Server Error: ${error.message}`);
        }
        if (stderr && !stderr.includes("ffmpeg version")) {
            console.error(`FFmpeg stderr: ${stderr}`);
        }
        // Send back the FFmpeg version info as confirmation
        res.status(200).send(`<pre>${stdout}</pre>`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
