# whisper_asr_app/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import Transcription
import requests
import time
import json


def index(request):
    return render(request, 'index.html')


def transcribe_audio(request):
    if request.method == 'POST':
        transcription = request.POST.get('transcription', '')

        # Replace 'YOUR_WHISPER_API_KEY' with your actual Whisper ASR API key
        api_key = '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'
        api_url = 'https://api.openai.com/v1/audio/transcriptions'

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
        }

        data = {
            'audio': [transcription],
        }

        try:
            response = requests.post(
                api_url, headers=headers, json=data, timeout=90)
            response.raise_for_status()
            result = response.json()

            return JsonResponse({'transcription': result[0].get('text', '')})
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': f'Error during transcription: {e}'})

    return JsonResponse({'error': 'Invalid request method'})



def save_transcription(request):
    if request.method == 'POST':
        text_data = request.POST.get('text')  # Assuming the name of the textarea is 'text'
        my_instance = Transcription(text=text_data)  # Corrected the field name here
        my_instance.save()
        success = True
    else:
        success = False

    return render(request, 'index.html', {'success': success})