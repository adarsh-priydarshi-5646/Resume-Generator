document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const about = document.getElementById('about').value;
    const skills = document.getElementById('skills').value.split(',');
    const projects = document.getElementById('projects').value.split('\n');
    const education = document.getElementById('education').value.split('\n');
    const profilePic = document.getElementById('profilePic').files[0];

    const reader = new FileReader();
    reader.onload = function () {
        const profileImageUrl = reader.result;

        const resumePreview = document.getElementById('resumePreview');
        resumePreview.innerHTML = `
            <div class="resume-header">
                <img src="${profileImageUrl}" alt="Profile Picture" class="profile-img">
                <h1>${name}</h1>
                <p>${title}</p>
            </div>
            <div class="resume-section">
                <h2>About</h2>
                <p>${about}</p>
            </div>
            <div class="resume-section">
                <h2>Contact</h2>
                <p>📱 ${phone}</p>
                <p>📧 ${email}</p>
                <p>🌐 ${website}</p>
            </div>
            <div class="resume-section">
                <h2>Skills</h2>
                <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
            </div>
            <div class="resume-section">
                <h2>Projects</h2>
                <ul>${projects.map(project => `<li>${project.trim()}</li>`).join('')}</ul>
            </div>
            <div class="resume-section">
                <h2>Education</h2>
                <ul>${education.map(edu => `<li>${edu.trim()}</li>`).join('')}</ul>
            </div>
        `;
    };
    reader.readAsDataURL(profilePic);
});

document.getElementById('printResume').addEventListener('click', function () {
    const printContent = document.getElementById('resumePreview').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Resume</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
});
