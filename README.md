# Spots - Responsive Web Application

# Pitch
https://drive.google.com/file/d/1gBhueo-tRW2xrv4pJ3xF2YAHslytKn5F/view?usp=drive_link


## Live Demo

Deployed on GitHub Pages:

- https://billyboycoder.github.io/se_project_spots/



A responsive web application project focused on displaying content correctly across popular screen sizes. This project emphasizes mobile-first design principles and cross-device compatibility.

##  Project Overview

Spots is a software engineering project designed to demonstrate responsive web development skills. The application ensures all elements are displayed correctly on various screen sizes, from mobile devices to desktop computers.

  
**Figma**  
  
* [Link to the project on Figma](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1).

**Images**  
  
The way you'll do this at work is by exporting images directly from Figma — we recommend doing that to practice more. Don't forget to optimize them [here](https://tinypng.com/), so your project loads faster. 
  
Good luck and have fun!

##  Features

- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop screens
- **Cross-Browser Compatibility**: Works seamlessly across modern browsers
- **Optimized Performance**: Images and assets are optimized for faster loading
- **Modern CSS**: Utilizes contemporary CSS techniques and best practices
- **Clean Code Structure**: Well-organized and maintainable codebase

##  Technologies Used

- **HTML5**: Semantic markup for better accessibility
- **CSS3**: Modern styling with Flexbox/Grid layouts
- **Responsive Design**: Media queries and flexible layouts
- **Image Optimization**: Compressed assets for better performance

##  Screen Size Support

The application is optimized for:
- Mobile devices (320px - 768px)
- Tablets (768px - 1024px)
- Desktop screens (1024px+)
- Large displays (1440px+)

##  Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS

### Deployment to GitHub Pages

To deploy this project to GitHub Pages:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Wait for deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - Your site will be available at: `https://billyboycoder.github.io/se_project_spots/`

4. **Verify deployment**
   - Click the **Visit site** button in the Pages settings
   - Or navigate directly to your GitHub Pages URL
   - Test all features across different devices

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BillyBoyCoder/se_project_spots.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd se_project_spots
   ```

3. **Open the project**
   - Open `index.html` in your web browser, or
   - Use a local development server:
   ```bash
     
   # Using Node.js
   npx serve .
   ```

4. **View the application**
   - Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
se_project_spots/
├── blocks/
│   ├── card.css          # card stylesheet
│   ├── cards.css          # cards stylesheet
│   ├── content.css          # content stylesheet
│   ├── footer.css          # footer stylesheet
│   ├── header.css          # header stylesheet
│   ├── page.css          # page stylesheet
│   └── profile.js           # profile JavaScript file
├── images/                # Image assets
├── pages/
│   └── index.css          # index stylesheet
├── vendor/                # Third-party libraries
│   ├── fonts               # Font assets
│   ├── font.css          # font stylesheet
│   └── normalize.css    # CSS reset/normalize
├── index.html              # main page
└── README.md           # Project documentation
```

## Design Resources

This project is based on Figma designs. When working on similar projects:

1. **Export images directly from Figma** for accurate implementation
2. **Optimize images** using tools like [TinyPNG](https://tinypng.com/) before adding to project
3. **Follow design specifications** for spacing, typography, and colors
4. **Test on multiple devices** to ensure responsive behavior

##  Responsive Breakpoints

```css
/* Mobile First Approach */
@media screen and (min-width: 768px) {
  /* Tablet styles */
}

@media screen and (min-width: 1024px) {
  /* Desktop styles */
}

@media screen and (min-width: 1440px) {
  /* Large desktop styles */
}
```

##  Testing

- **Cross-browser testing**: Chrome, Firefox, Safari, Edge
- **Device testing**: Various mobile devices and screen sizes
- **Performance testing**: Page load speed and optimization
- **Accessibility testing**: Screen readers and keyboard navigation

## Performance Optimization

- **Image Compression**: All images optimized for web delivery
- **CSS Minification**: Compressed stylesheets for faster loading
- **Responsive Images**: Multiple image sizes for different screen densities
- **Efficient CSS**: Optimized selectors and minimal redundancy

##  Development Guidelines

- Follow semantic HTML practices
- Use CSS custom properties for consistent theming
- Implement mobile-first responsive design
- Optimize images before committing
- Test on multiple devices and browsers
- Write clean, commented code

## Code Requirements
General Requirements. In this sprint, we're going to pay special attention to how your code is structured in functions. Try to ensure each function has a single purpose and that it fulfills that purpose only.

Form Validation Requirements. Wrap your validation code inside functions, as you did in the chapter on form validation. The enableValidation() function should be called in validation.js, to allow us to validate our forms. 

Make sure that the enableValidation() function accepts an object similar to the following. The object should contain the selectors and classes that are required for form validation:

```javascript
// Declaring a configuration object that contains the
// necessary classes and selectors. 
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

// Passing the configuration object to enableValidation when we call it.
enableValidation(settings);
```
This object contains class names and class selectors. Selectors are used, for instance, for looking up elements in the DOM via querySelector() or querySelectorAll() methods, while class names can be used with the classList.add() or classList.remove() methods.

💡 These kinds of objects are usually called configuration objects and are a common way of passing multiple recurring parameters to functions in JavaScript.

Make sure to update the object to include the selectors and classes that you are using in your own project.

Pass this configuration object as an argument to all of the validation methods and make use of it instead of using hard-coded strings. Here is a partial example:
```javascript
function enableValidation(config) {
  // Use config.formSelector instead of ".modal__form"
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    // Pass the config object to setEventListeners.
    setEventListeners(formEl, config);
  })
}

function setEventListeners(formElement, config) {
  // Use config.submitButtonSelector instead of ".modal__button"
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  // and so on
}


```

##  Known Issues

- Document any current bugs or limitations
- Include workarounds if available
- Link to relevant GitHub issues

## 📄 License

This project is part of a software engineering curriculum. Please refer to your institution's guidelines regarding code sharing and collaboration.

##  Author

**BillyBoyCoder**
- GitHub: [@BillyBoyCoder](https://github.com/BillyBoyCoder)

##  Acknowledgments

- Thanks to the software engineering curriculum @TripleTen for project requirements
- Figma community for design resources
- TinyPNG for image optimization tools

---

**Note**: This project emphasizes responsive design principles and cross-device compatibility. Take time to test thoroughly across different screen sizes for the best learning experience.

*Good luck and have fun building! *

  

