from django.db import models

class Quiz(models.Model):
    question = models.TextField()
    answer_1 = models.TextField()
    answer_2 = models.TextField()
    answer_3 = models.TextField()
    answer_4 = models.TextField()
    correct = models.CharField(max_length=1)
    image = models.CharField(max_length=100)

class User_Details(models.Model):
    email_address = models.EmailField(max_length=100)
    password = models.CharField(max_length=50)

class User_Scores(models.Model):
    user_id = models.ForeignKey(User_Details, on_delete=models.CASCADE, null=True, default=None, db_column='group_code')
    score = models.IntegerField()