var prediction = "";

Webcam.set
({
    width: 350,
    height: 300,
    image_format: 'jpg',
    jpg_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WW92kV9pi/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("image_captured");
    classifier.classify(img,gotResult);
}
function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (result[0].label == "Ok")
        {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if (result[0].label == "Good")
        {
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if(result[0].label == "Victory")
        {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
    }
}