from .forms import ContactsForm
from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.template import Context
from django.template.loader import get_template
from django.views import generic


# Create your views here.
class IndexView(generic.TemplateView):
    template_name = 'companies/index.html'

class ServicesView(generic.TemplateView):
    template_name = 'companies/services.html'

class MyBlogView(generic.TemplateView):
    template_name = 'companies/myBlog.html'

class AboutUsView(generic.TemplateView):
    template_name = 'companies/aboutUs.html'

class FormsView(generic.TemplateView):
    template_name = 'companies/forms.html'



def contacts(request):
    form_class = ContactsForm
    # new logic!

    if request.method == 'POST':
        form = form_class(data=request.POST)

        if form.is_valid():
            contact_name = request.POST.get(
                'contact_name', '')
            contact_email = request.POST.get(
                'contact_email', '')
            contact_subject = request.POST.get(
                'contact_subject', '')
            form_content = request.POST.get('content', '')

            # Email the profile with the
            # contact information
            template = get_template("companies/contacts_template.text")
            context = Context({
                'contact_name': contact_name,
                'contact_email': contact_email,
                'contact_subject': contact_subject,
                'form_content': form_content,
            })
            content = template.render(context)

            email = EmailMessage(
                "New contact form submission",
                content,
                "Your website" + '',
                ['youremail@gmail.com'],
                headers={'Reply-To': contact_email}
            )
            email.send()
            return redirect('companies:index')

    return render(request, "companies/contacts.html", {'form': form_class, })



