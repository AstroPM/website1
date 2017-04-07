from django import forms

# our new form
class ContactsForm(forms.Form):
    contact_name = forms.CharField(
        max_length=250,
        widget=forms.TextInput(attrs={'class': "form-control"}),)

    contact_email = forms.EmailField(
        max_length=250,
        widget=forms.TextInput(attrs={'class': "form-control"}),)

    contact_subject = forms.CharField(
        max_length=250,
        widget=forms.TextInput(attrs={'class': "form-control"}),)
    content = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'class': "form-control"})
    )

# the new bit we're adding
    def __init__(self, *args, **kwargs):
        super(ContactsForm, self).__init__(*args, **kwargs)
        self.fields['contact_name'].label = "Name:"
        self.fields['contact_email'].label = "E-mail:"
        self.fields['contact_subject'].label = "Subject:"
        self.fields['content'].label = "Message"