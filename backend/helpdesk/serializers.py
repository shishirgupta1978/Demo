from rest_framework import serializers
from .models import Department,Ticket,Note

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id','name','users']


class NoteSerializer(serializers.ModelSerializer):
    username=serializers.SerializerMethodField()
    class Meta:
        model = Note
        fields = ['id','user','text','ticket','time','attachment','username']
    def get_username(self, obj):
        return obj.user.username


class TicketSerializer(serializers.ModelSerializer):
    department_name = serializers.SerializerMethodField()
    requester_name = serializers.SerializerMethodField()
    assign_to_name = serializers.SerializerMethodField()
    notes=NoteSerializer(many=True,read_only=True)
    
    class Meta:
        model = Ticket
        fields = ['id','user','title','description','attachment','department','created_at','updated_at','assign_to','resolved','department_name','notes','assign_to_name','requester_name']

    def get_department_name(self, obj):
        return obj.department.name

    def get_requester_name(self, obj):
        return obj.user.username

    def get_assign_to_name(self, obj):
        if obj.assign_to:
            return obj.assign_to.username
        else:
            return "Not Assigned"

