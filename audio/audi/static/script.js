$(document).ready(function() {
    const audioInput = $('#transcription-text');
    const copyButton = $('#copyButton');
    const clearButton = $('#clearButton');

    let recognition;
    let isRecording = false;
    let transcription = ''; // Variable to store transcription

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = function(event) {
            let interimTranscription = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    // Append final transcription to the main transcription with a line break
                    transcription += '\n' + event.results[i][0].transcript;
                } else {
                    // Append interim transcription to interimTranscription variable
                    interimTranscription += event.results[i][0].transcript;
                }
            }

            // Display interim transcription in real-time
            audioInput.val(transcription + '\n' + interimTranscription);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = function() {
            if (isRecording) {
                recognition.start();
            }
        };

        copyButton.click(function() {
            audioInput.select();
            document.execCommand("copy");
        });

        clearButton.click(function() {
            // Clear the transcription area
            transcription = '';
            audioInput.val('');
        });
    
        $('#recordButton').click(function() {
            if (!isRecording) {
                isRecording = true;
                recognition.start();
                $('#recordButton').text('Stop Recording');

                setTimeout(function() {
                    isRecording = false;
                    recognition.stop();
                    $('#recordButton').text('Start Recording');

                    // Clear the transcription after recording stops
                    transcription = '';
                    audioInput.val('');
                }, 90000);
            } else {
                isRecording = false;
                recognition.stop();
                $('#recordButton').text('Start Recording');
            }
        });

    
    } else {
        audioInput.val("Sorry, your browser doesn't support the Web Speech API. Please use a modern browser.");
    }
});
