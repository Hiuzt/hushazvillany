import { AfterViewInit, Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        const classNames = ['.title', '.title2', '.title3'];
        classNames.forEach((className, index) => {
            const textWrapper = document.querySelector(className);
            if (textWrapper !== null && textWrapper.textContent !== null) {
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter opacity-0'>$&</span>");
                setTimeout(() => {
                    anime.timeline({ loop: false })
                        .add({
                            targets: `${className} .letter`,
                            scale: [4, 1],
                            opacity: [0, 1],
                            translateZ: 0,
                            easing: "easeOutExpo",
                            duration: 700,
                            delay: (el, i) => 50 * i
                        });
                }, 1000 * index);
            }
        });

    }
}
