from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

@api_view(['GET'])
def get_questions(request):
    questions = Quiz.objects.all()
    serializer = QuizSerializer(questions, many=True)
    return Response(serializer.data, status.HTTP_200_OK)

@api_view(['GET'])
def get_user_scores(request, current_user):
    scores = User_Scores.objects.filter(user_id=current_user)
    serializer = ScoresSerializer(scores, many=True)
    return Response(serializer.data, status.HTTP_200_OK)

@api_view(['POST'])
def save_user_scores(request):
    user = User_Details.objects.filter(id=request.data['current_user_id']).first()
    new_result=User_Scores.objects.create(user_id=user, score=request.data['current_score'])
    return Response(new_result.id, status.HTTP_200_OK)

@api_view(['POST'])
def add_new_user(request):
    new_user=User_Details.objects.create(email_address = request.data['email'], password=request.data['password'])
    return Response(new_user.id, status.HTTP_200_OK)

@api_view(['PUT'])
def validate_user(request):
    user= User_Details.objects.filter(email_address = request.data['user_email']).first()
    if not user:
        return Response(data='Please sign up');
    if user.password == request.data['user_password']:
        return Response(user.id, status.HTTP_200_OK);
    return Response(data="Wrong Password");