
const paginationBev = Behavior({
	data: {
		dataArray: [],
		total: null,
		noResult: false,
		loading: false,
	},

	methods: {
		setMoreData(dataArray) {
			const tempArray = this.data.dataArray.concat(dataArray);
			this.setData({
				dataArray: tempArray
			})
		}, 

		setTotal(total) {
			this.data.total = total;
			if (total == 0) {
				this.setData({
					noResult: true
				})
			}
		},

		getCurrentStart() {
			return this.data.dataArray.length;
		},

		hasMore() {
			if (this.data.dataArray.length >= this.data.total) return false
			else return true 
		},

		initialize() {
			this.data.total = null;
			this.setData({
				dataArray: [],
				noResult: false,
				loading: false,
			})
		},

    isLocked() {
      return this.data.loading ? true : false;
    },

    locked() {
      this.setData({
        loading: true
      });
    },

    unLocked() {
      this.setData({
        loading: false
      });
    }
	}
})

export { paginationBev };