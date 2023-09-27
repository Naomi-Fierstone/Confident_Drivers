from rest_framework import serializers
from .models import *

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'question', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'correct', 'image')

class ScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Scores
        fields = ('user_id', 'score')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Details
        fields = ('id', 'email_address', 'password')