<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body p-3 d-flex align-items-center">
                  <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                    <i class="fas fa-wallet"></i>
                  </div>
                  <div>
                    <div class="text-value text-primary">&#8369; {{details['payment']}}</div>
                    <div class="text-muted text-uppercase font-weight-bold small">Total Payout</div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>