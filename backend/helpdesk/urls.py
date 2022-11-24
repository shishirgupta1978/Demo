from django.urls import path,include
from .views import TicketListAPIView, DepartmentTicketListAPIView,DepartmentListAPIView,NoteListAPIView

urlpatterns = [
    path('ticket/',TicketListAPIView.as_view() ),
    path('ticket/<id>/',TicketListAPIView.as_view() ),
    path('department_ticket/',DepartmentTicketListAPIView.as_view() ),
    path('department_ticket/<id>/',DepartmentTicketListAPIView.as_view() ),
    path('departments/',DepartmentListAPIView.as_view() ),
    path('notes/',NoteListAPIView.as_view() ),
]