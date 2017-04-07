from django.conf.urls import url
from . import views

app_name = 'companies'

urlpatterns = [

        # /companies/
        url(r'^$', views.IndexView.as_view(), name="index"),
        # /companies/contact/
        url(r'^contacts/$', views.contacts, name="contacts"),
        # /companies/landViews/
        url(r'^services/$', views.ServicesView.as_view(), name="services"),
        # /companies/landViews/
        url(r'^myBlog/$', views.MyBlogView.as_view(), name="myBlog"),
        # /companies/about_us/
        url(r'^aboutUs/$', views.AboutUsView.as_view(), name="aboutUs"),

        url(r'^forms/$', views.FormsView.as_view(), name="forms"),

]
