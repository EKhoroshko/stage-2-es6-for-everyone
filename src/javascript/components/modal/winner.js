import { showModal } from './modal'

export function showWinnerModal(fighter) {
  // call showModal function 
  showModal({
    title: 'Winner',
    bodyElement: fighter.name,
    onClose: () => {
      window.location.reload();
    }
  })
}
