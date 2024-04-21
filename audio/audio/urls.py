from django.contrib import admin
from django.urls import path , include
from audi.views import index , transcribe_audio
from audi.views import save_transcription

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index,name='index'),
    path('transcribe/',transcribe_audio , name='transcribe_audio'),
    path('save_transcription/', save_transcription, name='save_transcription'),
]
