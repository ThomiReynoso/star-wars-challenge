import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    itemType: 'items'
  }

  it('should render pagination info correctly', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('Showing 1 to 10 of 50 items')
  })

  it('should not render when total pages is 1 or less', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        totalPages: 1
      }
    })

    expect(wrapper.find('.pagination').exists()).toBe(false)
  })

  it('should render previous and next buttons', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps
    })

    const prevButton = wrapper.find('button[aria-label="Go to previous page"]')
    const nextButton = wrapper.find('button[aria-label="Go to next page"]')

    expect(prevButton.exists()).toBe(true)
    expect(nextButton.exists()).toBe(true)
    expect(prevButton.text()).toContain('Previous')
    expect(nextButton.text()).toContain('Next')
  })

  it('should disable previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 1
      }
    })

    const prevButton = wrapper.find('button[aria-label="Go to previous page"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
    expect(prevButton.classes()).toContain('disabled')
  })

  it('should disable next button on last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 5,
        totalPages: 5
      }
    })

    const nextButton = wrapper.find('button[aria-label="Go to next page"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
    expect(nextButton.classes()).toContain('disabled')
  })

  it('should emit page-change when clicking previous button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 3
      }
    })

    const prevButton = wrapper.find('button[aria-label="Go to previous page"]')
    await prevButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')![0]).toEqual([2])
  })

  it('should emit page-change when clicking next button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 3
      }
    })

    const nextButton = wrapper.find('button[aria-label="Go to next page"]')
    await nextButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')![0]).toEqual([4])
  })

  it('should not emit when clicking disabled previous button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 1
      }
    })

    const prevButton = wrapper.find('button[aria-label="Go to previous page"]')
    await prevButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeFalsy()
  })

  it('should not emit when clicking disabled next button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 5,
        totalPages: 5
      }
    })

    const nextButton = wrapper.find('button[aria-label="Go to next page"]')
    await nextButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeFalsy()
  })

  it('should show all pages when total pages <= 7', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        totalPages: 5
      }
    })

    const pageButtons = wrapper.findAll('.page-btn')
    expect(pageButtons).toHaveLength(5)

    // Check that pages 1-5 are shown
    for (let i = 1; i <= 5; i++) {
      expect(wrapper.text()).toContain(i.toString())
    }
  })

  it('should mark current page as active', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 3
      }
    })

    const pageButtons = wrapper.findAll('.page-btn')
    const activeButton = pageButtons.find(button => button.classes().includes('active'))

    expect(activeButton?.text()).toBe('3')
  })

  it('should emit page-change when clicking page number', async () => {
    const wrapper = mount(Pagination, {
      props: defaultProps
    })

    const pageButtons = wrapper.findAll('.page-btn')
    const page3Button = pageButtons.find(button => button.text() === '3')

    if (page3Button) {
      await page3Button.trigger('click')
      expect(wrapper.emitted('page-change')).toBeTruthy()
      expect(wrapper.emitted('page-change')![0]).toEqual([3])
    }
  })

  it('should not emit when clicking current page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 3
      }
    })

    const pageButtons = wrapper.findAll('.page-btn')
    const currentPageButton = pageButtons.find(button => 
      button.text() === '3' && button.classes().includes('active')
    )

    if (currentPageButton) {
      await currentPageButton.trigger('click')
      expect(wrapper.emitted('page-change')).toBeFalsy()
    }
  })

  it('should show ellipsis for large page counts', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 10,
        totalPages: 20
      }
    })

    const ellipsis = wrapper.findAll('.ellipsis')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it('should calculate start and end items correctly for middle pages', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 3,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10
      }
    })

    expect(wrapper.text()).toContain('Showing 21 to 30 of 50 items')
  })

  it('should calculate start and end items correctly for last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 5,
        totalPages: 5,
        totalItems: 47, // Not a perfect multiple
        itemsPerPage: 10
      }
    })

    expect(wrapper.text()).toContain('Showing 41 to 47 of 47 items')
  })

  it('should use custom item type in display text', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        itemType: 'characters'
      }
    })

    expect(wrapper.text()).toContain('Showing 1 to 10 of 50 characters')
  })

  it('should handle pagination config for current page near start', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 2,
        totalPages: 15
      }
    })

    // Should show pages 1,2,3,4,5,6 ... 15
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('4')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('6')
    expect(wrapper.text()).toContain('15')
    expect(wrapper.text()).toContain('...')
  })

  it('should handle pagination config for current page near end', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 14,
        totalPages: 15
      }
    })

    // Should show 1,2,3,4 ... 13,14,15
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('4')
    expect(wrapper.text()).toContain('13')
    expect(wrapper.text()).toContain('14')
    expect(wrapper.text()).toContain('15')
    expect(wrapper.text()).toContain('...')
  })
})