
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.conf import settings

# from .models import Subscriber

def send_html_email(to_list, subject, template_name, context, sender=settings.DEFAULT_FROM_EMAIL):
    msg_html = render_to_string(template_name, context)
    msg = EmailMessage(subject=subject, body=msg_html, from_email=sender, bcc=to_list)
    msg.content_subtype = "html"  # Main content is now text/html
    return msg.send(fail_silently=False)

# for example
def notify_subscribers():
    emails = ["rajeshmeena.iitkgp@gmail.com"]
    context = {
        'news': 'We have received your order'
    }
    send_html_email(emails, subject='Order received', template_name='email.html', context=context, sender="info@impactocean.com")