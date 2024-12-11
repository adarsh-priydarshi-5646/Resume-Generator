document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
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
                <p>🌐 <a href="${website}" target="_blank">${website}</a></p>
            </div>
            <div class="resume-section">
                <h2>Social Media</h2>
                <ul>
                    <li><a href="${github}" target="_blank">GitHub</a></li>
                    <li><a href="${linkedin}" target="_blank">LinkedIn</a></li>
                    <li><a href="${twitter}" target="_blank">Twitter</a></li>
                </ul>
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
    document.getElementById('printResume').style.display = 'none'; // Hide the print button during print

    const resumeContent = document.getElementById('resumePreview').innerHTML;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Resume</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    color: black;
                    margin: 0;
                    padding: 0;
                    font-size: 12pt;
                }
                .resume {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 800px;
                    margin: 20px auto;
                }
                .resume-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .resume-header .profile-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 3px solid #8000ff;
                    margin: 0 auto 15px;
                }
                .resume-header h1 {
                    font-size: 22px;
                }
                .resume-header p {
                    font-size: 16px;
                    color: #d633ff;
                }
                .resume-section h2 {
                    font-size: 18px;
                    color: #8000ff;
                    margin-bottom: 10px;
                }
                .resume-section ul {
                    padding-left: 20px;
                    list-style-type: square;
                }
                .resume-section a {
                    color: #8000ff;
                    text-decoration: none;
                }
                .resume-section a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="resume">
                ${resumeContent}
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();

    setTimeout(() => {
        document.getElementById('printResume').style.display = 'block'; // Show the print button after print
    }, 1000);
});
