//красивые анимации
export function canOpenHeader(){
    const element1 = document.querySelector('.profile__about-self');
    const element2= document.querySelector('.profile__name');
    return !((element1.scrollWidth <= element1.clientWidth)&&(element2.scrollWidth <= element2.clientWidth)) ;
};
export function openHeader(){
    if (document.querySelector('.profile').classList.contains('profile_open')) {
        document.querySelector('.profile').classList.remove('profile_open');
        setTimeout(() => {
            document.querySelector('.profile').classList.remove('profile_column');
        },1000);
        return;
    }
    document.querySelector('.profile').classList.add('profile_hide');
    setTimeout(() => {
        document.querySelector('.profile').classList.add('profile_column');
        document.querySelector('.profile').classList.remove('profile_hide');
        document.querySelector('.profile').classList.add('profile_open');
    },500);
};
