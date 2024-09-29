document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register');
    

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            const name = formData.get('name');
            const id_number = formData.get('id_number');
            const constituency = formData.get('constituency');

            if (name !== '' && id_number !== '' && constituency !== '') {
                const register = {
                   name,
                   id_number,
                   constituency
                }  

                try {
                    const response = await fetch('/register',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify(register)
                    });

                    if (response.ok) {
                        alert('Information added successfully');
                        window.location.href ='/register';
                                            
                    } else {
                        alert('Information addition failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }

            }
        });
    }   
});